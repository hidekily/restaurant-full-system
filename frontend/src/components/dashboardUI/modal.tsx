import { ReactNode } from "react"

interface ModalProps{
    header: ReactNode,
    title?: string,
    subtitle?: ReactNode
    buttons?:{
        onclick: () => void
        text?: string
        colorVariant: "add" | "danger" | "mid"
    }[]
}

const variantColors = {
  add: "bg-[#3A7D32]",
  danger: "bg-[#D94550]",
  mid: "bg-[#c4956a]",
}

export function Modal({header, title, subtitle, buttons}:ModalProps){
    return(
        <>
            <div className="inset-0 fixed bg-[#f4EAe0]/50 flex justify-center items-center w-full h-full">
                <section className="bg-[#e8d8c4] w-[45%] h-[50%] flex flex-col jusstify-center items-center rounded-lg gap-2 border-1">
                    <div className="w-full h-[50%] flex flex-col justify-center p-8 gap-4">
                        <span>{header}</span>
                        <span className="text-3xl">{title}</span>
                        <span className="">{subtitle}</span>
                    </div>

                    <div className="w-full h-[50%] flex items-center p-8 gap-8">
                        {buttons && buttons.map((btn, index) => (
                            <button key={index} onClick={btn.onclick} className={`${variantColors[btn.colorVariant]} w-40 h-10 rounded-lg`}>
                                {btn.text}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}