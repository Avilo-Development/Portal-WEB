import fs from 'fs';
import path from 'path';
import MarkdownRender from '@/components/markdown.render';


export default function DocsProjects() {
    const filePath = path.join(process.cwd(), 'public', '/docs/hlc/README.md');
    const content = fs.readFileSync(filePath, 'utf8');
    return <MarkdownRender content={content} />
}