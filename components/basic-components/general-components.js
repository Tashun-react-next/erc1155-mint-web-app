import Image from "next/image";

export const CustomImage = (props) => {
    return (
        <Image
            src={props.src}
            width={props.width}
            height={props.height}
            alt={props.alt}
        />
    )
}