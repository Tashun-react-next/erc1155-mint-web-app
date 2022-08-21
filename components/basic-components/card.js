export const getCard = (props) => {
    return (
        <div className="p-2">
            <div className="card" style={{"width": "18rem"}}>
                <img className="card-img-top" src={props?.image} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{props?.title}</h5>
                    <p className="card-text">{props?.description}</p>
                    <a href="#" className="btn btn-primary">Mint</a>
                </div>
            </div>
        </div>
    )
}