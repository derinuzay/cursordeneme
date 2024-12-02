import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFileContext } from '../contexts/FileContext';

export default function LandingPage() {
  const navigate = useNavigate();
  const { setJsonData, setImageFile } = useFileContext();
  const [uploadStatus, setUploadStatus] = useState('');

  const handleJsonUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          const jsonArray = Array.isArray(data) ? data : [data];
          setJsonData(jsonArray);
          setUploadStatus(`JSON dosyası başarıyla yüklendi, ${jsonArray.length} öğe tespit edildi`);
        } catch (error) {
          setUploadStatus('JSON dosyası geçerli değil!');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setUploadStatus('Görsel başarıyla yüklendi');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">JSON Veri Görselleştirici</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block mb-2">JSON Dosyası Yükle</label>
            <input
              type="file"
              accept=".json"
              onChange={handleJsonUpload}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-2">Görsel Yükle</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded"
            />
          </div>

          {uploadStatus && (
            <div className="bg-green-100 text-green-700 p-3 rounded">
              {uploadStatus}
            </div>
          )}

          <button
            onClick={() => navigate('/editor')}
            className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Düzenleyiciye Geç
          </button>
        </div>
      </div>
    </div>
  );
} 