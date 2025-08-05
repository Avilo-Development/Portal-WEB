import { useState, useCallback, useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, Position, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from '@/components/roadmap/custom.node';

const initialEdges = [
    { id: 'e2-3', source: 'CS -1', target: 'EST 1-1' },
    { id: 'e3-4', source: 'EST 1-1', target: 'CS 1-3' },
    { id: 'e4-5', source: 'CS 1-3', target: 'PRJ 1-4' },
    { id: 'e5-6', source: 'PRJ 1-4', target: 'EST 1-5' },
];

export default function TestGraph({ selected_id = '' }: { selected_id?: string }) {


    const nodeTypes = {
        svgNode: CustomNode,
    };
    const initialNodes = [
        //{ id: 'n1', type: 'svgNode', position: { x: 0, y: 0 }, data: { imageUrl: '/roadmap/CS -1 Rollover.svg', isCurrent: true } },
        {
            id: 'CS -1',
            type: 'svgNode',
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            position: { x: 0, y: 0 },
            data: {
                imageUrl: '/roadmap/CS -1.svg',
                isCurrent: false
            },
        },
        {
            id: 'EST 1-1',
            type: 'svgNode',
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            position: { x: 170, y: 0 },
            data: {
                imageUrl: '/roadmap/EST 1-1.svg',
                isCurrent: false,
            }
        },
        {
            id: 'CS 1-3',
            type: 'svgNode',
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            position: { x: 170 * 2, y: 0 },
            data: {
                imageUrl: '/roadmap/CS 1-3.svg',
                isCurrent: false
            }
        },
        {
            id: 'PRJ 1-4',
            type: 'svgNode',
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            position: { x: 170 * 3, y: 0 },
            data: {
                imageUrl: '/roadmap/PRJ 1-4.svg',
                isCurrent: false
            }
        },
        {
            id: 'EST 1-5',
            type: 'svgNode',
            sourcePosition: Position.Right,
            targetPosition: Position.Left,
            position: { x: 170 * 4, y: 0 },
            data: {
                imageUrl: '/roadmap/EST 1-5.svg',
                isCurrent: false
            }
        },
    ];

    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const { getNode } = useReactFlow();

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );

    const handleNodeDoubleClick = useCallback((sourceId: any) => {
        const sourceNode = getNode(sourceId);
        if (!sourceNode) return;
        const newId = `node-${Date.now()}`;
        const newNode = {
            id: newId,
            type: 'svgNode',
            position: { x: sourceNode.position.x, y: sourceNode.position.y + 60 }, // or calculate based on source node
            data: {
                imageUrl: `/roadmap/${sourceId}_Roll.svg`,
                onDoubleClick: handleNodeDoubleClick,
            },
        };

        setNodes((nds: any) => [...nds, newNode]);
        setEdges((eds: any) => [...eds, { id: `${sourceId}-${newId}`, source: sourceId, target: newId }]);
    }, []);

    useEffect(() => {
        if (selected_id) {
            const selectedNode = getNode(selected_id);
            if (selectedNode) {
                selectedNode.data.isCurrent = true;
                setNodes((nds) => nds.map((n) => (n.id === selected_id ? { ...n, data: { ...n.data, isCurrent: true } } : n)));
            }
        }
    }, [selected_id, getNode]);

    return (
        <div className='w-full h-[160px]' >
            <ReactFlow
                nodes={nodes.map((n) => ({
                    ...n,
                    data: { ...n.data, onDoubleClick: handleNodeDoubleClick },
                }))}
                edges={edges}
                nodeTypes={nodeTypes}
                onConnect={() => { }}         // Blocks new connections
                connectOnClick={false}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                fitView
            />
        </div>
    );
}