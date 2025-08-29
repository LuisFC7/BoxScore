import { usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import ModalPopUp from '@/components/ModalPopUp'

export default function Welcome() {

  const { props } = usePage<{ flash?: { title?: string; message?: string } }>()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (props.flash?.message) {
      setShowSuccess(true)
    }
  }, [props.flash])

  return (
    <div>
      <h1>Hola</h1>

        {showSuccess && (
            <ModalPopUp
                modalType="success"
                modalTitle={props.flash?.title || 'Éxito'}
                modalMessage={props.flash?.message || 'Registro exitoso'}
                modalShow={showSuccess}
                onClose={() => setShowSuccess(false)}
            />
        )}

    </div>
  )
}
