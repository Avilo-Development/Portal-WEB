export default function ProgressBar ({ value }: {value:number}) {
    return (
        <div className='h-3 rounded-full w-full bg-red-300'>
            <div
                style={{ width: `${value}%`}}
                className={`h-full rounded-full ${
                    value < 50 ? 'bg-red-600' : 'bg-green-600'}`}>
            </div>
        </div>
    );
};