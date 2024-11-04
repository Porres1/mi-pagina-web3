// Función para mostrar y ocultar los detalles de los proyectos
function mostrarDetalles(id) {
    const detalle = document.getElementById(id);
    detalle.style.display = (detalle.style.display === "none" || detalle.style.display === "") ? "block" : "none";
}

// Verifica si MetaMask está instalado y conecta la wallet
async function conectarWallet() {
    // Verifica si MetaMask (window.ethereum) está presente en el navegador
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Solicita acceso a la cuenta de MetaMask
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log("Wallet conectada: ", accounts[0]);
            alert("¡Wallet conectada exitosamente! Dirección: " + accounts[0]);
        } catch (error) {
            console.error("Error al conectar la wallet", error);
            alert("Error al conectar la wallet. Intenta nuevamente.");
        }
    } else {
        // Si MetaMask no está instalado
        alert("MetaMask no está instalado. Por favor, instálalo para continuar.");
    }
}

// Función para realizar un pago en criptomoneda
async function pagarConCrypto() {
    if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const direccionReceptor = "0xTuDireccionDeWallet";  // Reemplaza con la dirección de tu wallet de destino

        try {
            // Configura y envía la transacción
            const transaccion = await signer.sendTransaction({
                to: direccionReceptor,
                value: ethers.utils.parseEther("0.01") // Monto de la transacción en ETH
            });
            console.log("Transacción exitosa:", transaccion);
            alert("Pago realizado exitosamente!");
        } catch (error) {
            console.error("Error en la transacción", error);
            alert("Hubo un error en el pago. Intenta nuevamente.");
        }
    } else {
        alert("MetaMask no está instalado. Por favor, instálalo para continuar.");
    }
}

// Cambio de videos de fondo al hacer scroll
const backgroundVideos = document.querySelectorAll('.bg-video');
let currentVideoIndex = 0;

function changeBackgroundVideo() {
    backgroundVideos.forEach((video, index) => {
        video.classList.remove('active');
        if (index === currentVideoIndex) {
            video.classList.add('active');
            video.play();
        } else {
            video.pause();
        }
    });
}

// Cambia de video cada vez que se hace scroll
window.addEventListener('scroll', () => {
    if (window.scrollY % 500 < 5) {
        currentVideoIndex = (currentVideoIndex + 1) % backgroundVideos.length;
        changeBackgroundVideo();
    }
});

// Reproducción automática de videos de proyectos al estar visibles
const projectVideos = document.querySelectorAll('.proyecto-video');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.5 });

projectVideos.forEach(video => observer.observe(video));

// Eventos de botón para wallet
document.getElementById('btnConectar').addEventListener('click', conectarWallet);
document.getElementById('btnPagar').addEventListener('click', pagarConCrypto);
