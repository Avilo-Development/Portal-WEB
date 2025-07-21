export default function ProgressBar ({ value }: {value:number}) {
    return (
        <div className='h-1 w-full bg-red-300'>
            <div
                style={{ width: `${value}%`}}
                className={`h-full ${
                    value < 50 ? 'bg-red-600' : 'bg-green-600'}`}>
            </div>
        </div>
    );
};