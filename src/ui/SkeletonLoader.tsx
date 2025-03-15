import './SkeletonLoader.css'

function SkeletonLoader() {
    return (
        <div>
            <div className="skeleton">
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
            </div>

            <div className="skeleton">
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
            </div>

            <div className="skeleton">
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
                <div className="skeleton__block"></div>
            </div>
        </div>
    )
}

export default SkeletonLoader