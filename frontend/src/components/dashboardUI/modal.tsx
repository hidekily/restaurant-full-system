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
                <section className="bg-[#e8d8c4] w-[90%] h-auto flex flex-col justify-center items-center rounded-lg gap-2 border-1 sm:w-[45%] sm:h-[50%]">
                    <div className="w-full flex flex-col justify-center p-5 gap-3 sm:h-[50%] sm:p-8 sm:gap-4">
                        <span>{header}</span>
                        <span className="text-xl sm:text-3xl">{title}</span>
                        <span className="text-sm sm:text-base">{subtitle}</span>
                    </div>

                    <div className="w-full flex items-center p-5 gap-4 sm:h-[50%] sm:p-8 sm:gap-8">
                        {buttons && buttons.map((btn, index) => (
                            <button key={index} onClick={btn.onclick} className={`${variantColors[btn.colorVariant]} w-full h-10 rounded-lg text-sm sm:w-40 sm:text-base`}>
                                {btn.text}
                            </button>
                        ))}
                    </div>
                </section>
            </div>
        </>
    )
}