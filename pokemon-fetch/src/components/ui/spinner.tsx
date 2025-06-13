import { BounceLoader } from 'react-spinners';

const Spinner = ({loading}) => {
    return (
        <div className='flex justify-center items-center'>
            <BounceLoader
                loading={loading}
                size={60}
                color="#36d7b7"
                aria-label='Loading Spinner'
                data-testid='loader'
            />
        </div>
    )
}

export default Spinner;