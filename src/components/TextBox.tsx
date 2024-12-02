import React from 'react';
import { Rnd } from 'react-rnd';
import { TextBoxData } from '../types';

interface TextBoxProps extends Omit<TextBoxData, 'onChange'> {
  isSelected: boolean;
  onSelect: () => void;
  onChange: (data: Partial<TextBoxData>) => void;
  bounds?: Element | string;
}

interface DragData {
  node: HTMLElement;
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
  lastX: number;
  lastY: number;
}

export default function TextBox(props: TextBoxProps) {
  const handleDragStop = (_: any, data: DragData) => {
    props.onChange({
      id: props.id,
      x: data.x,
      y: data.y
    });
  };

  const handleResize = (_: any, 
    direction: string, 
    ref: HTMLElement, 
    delta: { width: number; height: number }, 
    position: { x: number; y: number }
  ) => {
    props.onChange({
      id: props.id,
      width: ref.offsetWidth,
      height: ref.offsetHeight,
      x: position.x,
      y: position.y
    });
  };

  return (
    <Rnd
      default={{
        x: props.x,
        y: props.y,
        width: props.width,
        height: props.height
      }}
      minWidth={100}
      minHeight={50}
      bounds={props.bounds || "parent"}
      onDragStop={handleDragStop}
      onResize={handleResize}
      onMouseDown={props.onSelect}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          border: props.isSelected ? '2px dashed black' : '1px dashed rgba(0,0,0,0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '8px',
          fontSize: `${props.fontSize}px`,
          fontFamily: props.fontFamily,
          color: props.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: props.textAlign || 'left',
          userSelect: 'none',
          cursor: 'move',
          overflowWrap: 'break-word',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap'
        }}
      >
        {props.jsonKey ? `{${props.jsonKey}}` : 'Metin Kutusu'}
      </div>
    </Rnd>
  );
} 