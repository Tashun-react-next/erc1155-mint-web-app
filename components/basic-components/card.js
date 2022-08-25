import { PopupModal } from "../PopupModal/popup-modal";

export const getCard = (props) => {
  return (
    <div className="p-2" key={props.key}>
      <div className="card" style={{ width: "18rem" }}>
        <img className="card-img-top" src={props?.image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{props?.title}</h5>
          <p className="card-text">{props?.description}</p>
          {props?.showBalance && props?.balance && (
            <p className="card-text">Available Tokens: {props?.balance}</p>
          )}
          {props?.showButton && (
            <PopupModal
              buttonName={props?.buttonName}
              title={props?.title}
              id={props?.no}
              hideButton={false}
              rate={props?.rate}
              showDropdownView={props.showDropdownView}
              description={props?.description}
              func={props?.onClickFunction}
            />
          )}
        </div>
      </div>
    </div>
  );
};
