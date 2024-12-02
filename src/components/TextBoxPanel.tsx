import React from 'react';
import { TextBoxData } from '../types';

interface TextBoxPanelProps {
  selectedBox: Pick<TextBoxData, 'id' | 'jsonKey' | 'fontSize' | 'fontFamily' | 'color' | 'textAlign'>;
  jsonKeys: string[];
  onChange: (changes: Partial<TextBoxData>) => void;
}

export default function TextBoxPanel({ selectedBox, jsonKeys, onChange }: TextBoxPanelProps) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">Metin Kutusu Özellikleri</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block mb-1">JSON Anahtarı</label>
          <select
            value={selectedBox.jsonKey}
            onChange={(e) => onChange({ jsonKey: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="">Seçiniz</option>
            {jsonKeys.map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Yazı Boyutu</label>
          <input
            type="number"
            value={selectedBox.fontSize}
            onChange={(e) => onChange({ fontSize: Number(e.target.value) })}
            className="w-full border rounded p-2"
            min="8"
            max="72"
          />
        </div>

        <div>
          <label className="block mb-1">Yazı Tipi</label>
          <select
            value={selectedBox.fontFamily}
            onChange={(e) => onChange({ fontFamily: e.target.value })}
            className="w-full border rounded p-2"
          >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Helvetica">Helvetica</option>
            <option value="Verdana">Verdana</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Hizalama</label>
          <div className="flex gap-2">
            <button
              onClick={() => onChange({ textAlign: 'left' })}
              className={`flex-1 p-2 border rounded ${
                selectedBox.textAlign === 'left' ? 'bg-blue-500 text-white' : ''
              }`}
              title="Sola Hizala"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <button
              onClick={() => onChange({ textAlign: 'center' })}
              className={`flex-1 p-2 border rounded ${
                selectedBox.textAlign === 'center' ? 'bg-blue-500 text-white' : ''
              }`}
              title="Ortala"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <button
              onClick={() => onChange({ textAlign: 'right' })}
              className={`flex-1 p-2 border rounded ${
                selectedBox.textAlign === 'right' ? 'bg-blue-500 text-white' : ''
              }`}
              title="Sağa Hizala"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M6 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm4-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-4-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <button
              onClick={() => onChange({ textAlign: 'justify' })}
              className={`flex-1 p-2 border rounded ${
                selectedBox.textAlign === 'justify' ? 'bg-blue-500 text-white' : ''
              }`}
              title="İki Yana Yasla"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M2 12.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
          </div>
        </div>

        <div>
          <label className="block mb-1">Yazı Rengi</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={selectedBox.color}
              onChange={(e) => onChange({ color: e.target.value })}
              className="w-8 h-8 p-0 border rounded cursor-pointer"
            />
            <span className="text-sm text-gray-600">
              {selectedBox.color}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 