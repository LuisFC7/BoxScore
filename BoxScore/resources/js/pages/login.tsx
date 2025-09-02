import { usePage } from '@inertiajs/react'
import { useState, useEffect } from 'react'
import ModalPopUp from '@/components/ModalPopUp'

export default function loginPage() {

  const { props } = usePage<{ flash?: { title?: string; message?: string } }>()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (props.flash?.message) {
      setShowSuccess(true)
    }
  }, [props.flash])

  return (
    <div>
      <h1>Login</h1>

        {showSuccess && (
            <ModalPopUp
                modalType="success"
                modalTitle={props.flash?.title || 'Éxito'}
                modalMessage={props.flash?.message || 'Verificación exitosa'}
                modalShow={showSuccess}
                onClose={() => setShowSuccess(false)}
            />
        )}

    </div>
  )
}
