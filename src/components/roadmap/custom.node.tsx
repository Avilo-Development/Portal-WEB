import { Handle, NodeProps, Position } from '@xyflow/react';

export default function CustomNode({id, data, isConnectable}: {id: string, data: any, isConnectable?: boolean}) {
  const handleClick = () => {
    if (data.onDoubleClick) {
      data.onDoubleClick(id);
    }
  }
  return (
    <>
      <Handle type="target" position={Position.Left} id='left' isConnectable={false} />
      <img onDoubleClick={handleClick} src={data.imageUrl} className={data.isCurrent ? 'border-2 border-amber-500 rounded-lg' : ''} alt="SVG Node" width={150} height={150} />
      <Handle type="source" position={Position.Right} id='right' isConnectable={false} />
    </>
  );
}