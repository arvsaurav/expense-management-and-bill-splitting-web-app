import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loader() {
    return (
        <div>
            <FontAwesomeIcon icon={faSpinner} spin />
        </div>
    )
}

export default Loader;