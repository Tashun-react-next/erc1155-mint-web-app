

export const ItemNavbar = (props) => {

    return (
        <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
                <svg className="bi pe-none me-2" width="16" height="16">
                    <use xlinkHref="#home"></use>
                </svg>
                {props.name}
            </a>
        </li>
    )

}