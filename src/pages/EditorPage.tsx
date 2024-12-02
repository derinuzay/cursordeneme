import React, { useState, useEffect } from 'react';
import { useFileContext } from '../contexts/FileContext';
import TextBox from '../components/TextBox';
import TextBoxPanel from '../components/TextBoxPanel';
import { TextBoxData, JsonItem } from '../types';

export default function EditorPage() {
  const { jsonData, imageFile } = useFileContext();
  const [textBoxes, setTextBoxes] = useState<TextBoxData[]>([]);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  const addTextBox = () => {
    const newBox: TextBoxData = {
      id: `box-${Date.now()}`,
      x: 100,
      y: 100,
      width: 200,
      height: 100,
      jsonKey: '',
      fontSize: 16,
      fontFamily: 'Arial',
      color: '#000000',
      textAlign: 'left'
    };
    setTextBoxes([...textBoxes, newBox]);
    setSelectedBox(newBox.id);
  };

  const handleBoxChange = (updatedData: Partial<TextBoxData>) => {
    setTextBoxes(textBoxes.map(box => 
      box.id === updatedData.id ? { ...box, ...updatedData } : box
    ));
  };

  const handleBoxSelect = (id: string) => {
    setSelectedBox(id);
  };

  const generateImages = async () => {
    if (!jsonData || !imageFile || textBoxes.length === 0 || !imageRef) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageUrl;
    await new Promise(resolve => img.onload = resolve);

    const imageRect = imageRef.getBoundingClientRect();
    const containerRect = imageRef.parentElement?.getBoundingClientRect();
    if (!containerRect) return;

    const imageOffsetX = imageRect.left - containerRect.left;
    
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    const newImages = await Promise.all((jsonData as JsonItem[]).map(async (item: JsonItem) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      textBoxes.forEach(box => {
        if (!box.jsonKey) return;

        const scaleX = img.naturalWidth / imageRect.width;
        const scaleY = img.naturalHeight / imageRect.height;

        const scaledFontSize = Math.round(box.fontSize * scaleX);
        ctx.font = `${scaledFontSize}px ${box.fontFamily}`;
        ctx.fillStyle = box.color;
        ctx.textBaseline = 'middle';
        ctx.textAlign = (box.textAlign as CanvasTextAlign) || 'left';

        const text = item[box.jsonKey]?.toString() || '';
        
        const relativeX = box.x - imageOffsetX;
        const scaledX = relativeX * scaleX;
        const scaledY = box.y * scaleY;
        const scaledWidth = box.width * scaleX;

        const words = text.split(' ');
        let lines: string[] = [];
        let currentLine = '';

        words.forEach(word => {
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > scaledWidth && currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });
        if (currentLine) {
          lines.push(currentLine);
        }

        const lineHeight = scaledFontSize * 1.2;
        lines.forEach((line, i) => {
          if (box.textAlign === 'justify' && i < lines.length - 1) {
            const words = line.split(' ');
            const spaceWidth = (scaledWidth - ctx.measureText(line.replace(/ /g, '')).width) / (words.length - 1);
            let currentX = scaledX;

            words.forEach((word, j) => {
              ctx.fillText(word, currentX, scaledY + (i * lineHeight) + (scaledFontSize / 2));
              if (j < words.length - 1) {
                currentX += ctx.measureText(word).width + spaceWidth;
              }
            });
          } else {
            let textX = scaledX;
            if (box.textAlign === 'center') {
              textX = scaledX + (scaledWidth / 2);
            } else if (box.textAlign === 'right') {
              textX = scaledX + scaledWidth;
            }

            ctx.fillText(line, textX, scaledY + (i * lineHeight) + (scaledFontSize / 2));
          }
        });
      });

      return canvas.toDataURL('image/png');
    }));

    newImages.forEach((dataUrl, index) => {
      const link = document.createElement('a');
      link.download = `image-${index + 1}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex gap-4">
          {/* Sol taraf - Düzenleme alanı */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between mb-4">
              <button
                onClick={addTextBox}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Metin Kutusu Ekle
              </button>
              <button
                onClick={generateImages}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                disabled={textBoxes.length === 0}
              >
                Görselleri Oluştur
              </button>
            </div>

            <div className="relative" style={{ height: '600px', border: '1px solid #ccc' }}>
              {imageUrl && (
                <img
                  ref={setImageRef}
                  src={imageUrl}
                  alt="Düzenlenecek görsel"
                  className="max-h-full mx-auto"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              )}
              {textBoxes.map((box) => (
                <TextBox
                  key={box.id}
                  {...box}
                  isSelected={selectedBox === box.id}
                  onSelect={() => handleBoxSelect(box.id)}
                  onChange={handleBoxChange}
                  bounds={imageRef as Element}
                />
              ))}
            </div>
          </div>

          {/* Sağ taraf - Özellikler paneli */}
          {selectedBox && (
            <div className="w-72">
              <TextBoxPanel
                selectedBox={textBoxes.find(box => box.id === selectedBox)!}
                jsonKeys={jsonData && jsonData[0] ? Object.keys(jsonData[0]) : []}
                onChange={(changes) => {
                  const currentBox = textBoxes.find(box => box.id === selectedBox)!;
                  handleBoxChange({ ...currentBox, ...changes });
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 