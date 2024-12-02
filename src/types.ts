export interface TextBoxData {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  jsonKey: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface JsonItem {
  [key: string]: string | number;
} 