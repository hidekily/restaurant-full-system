interface ConfirmModalProps {
  title: string
  onConfirm: () => void
  isOpen: boolean
  onClose: () => void
}

export function ConfirmModal({ title, onConfirm, isOpen, onClose }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 border border-red-700 rounded-lg p-6 w-80">
        <h2 className="text-white text-lg mb-4">{title}</h2>
        
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-700 text-white rounded hover:bg-zinc-600"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}