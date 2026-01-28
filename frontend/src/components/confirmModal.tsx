interface ModalProps{
    title: string,
    isOpen: boolean,
    onConfirm: () => void,
    onCancel: () => void
}

export function ConfirmModal({title, isOpen, onCancel, onConfirm}:ModalProps) {
    if(!isOpen){
        return null
    }

    return(
     <>
        <div className="customfont2 inset-0 fixed bg-gray-800/50 flex justify-center items-center">
            <section className="bg-zinc-800 w-[50%] h-[35%] flex flex-col items-center gap-15 rounded-4xl">
                <span className="text-white text-3xl mt-5">
                    <p className="">{title}</p>
                </span>
                <section className="flex flex-row gap-10 w-full h-full justify-center items-center mb-4">
                    <button className="w-[40%] h-[40%] bg-zinc-950 text-white rounded-2xl hover:mt-1" onClick={onCancel}>
                        CANCEL
                    </button>
                    <button className="w-[40%] h-[40%] bg-zinc-950 text-red-700 rounded-2xl hover:mt-1" onClick={onConfirm}>
                        DELETE
                    </button>
                </section>
            </section>
         </div>
     </>
    )
}