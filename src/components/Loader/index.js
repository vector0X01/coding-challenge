import './style.css';

const Loader = ({loading}) => {
    if(loading)
        return (
            <div className='backdrop'>
                <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    return null;
}

export default Loader;