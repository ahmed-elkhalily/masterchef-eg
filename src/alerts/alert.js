import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'

export default function () {
  async function confirmAlert (msg) {
    return Swal.fire({
      customClass: {
        container: 'sweetAlertZConfig'
      },
      title: 'Are you sure?',
      text: msg,
      showDenyButton: true,
      confirmButtonText: 'yes',
      denyButtonText: 'cancel'
    })
  }
  async function message (msg, icon, text) {
    return Swal.fire({
      customClass: {
        container: 'sweetAlertZConfig'
      },
      title: msg,
      text,
      showDenyButton: true,
      icon: icon || 'success',
      showConfirmButton: false,
      denyButtonColor: '#2196F3',
      denyButtonText: 'Done'
    })
  }
  return { confirmAlert, message }
}
