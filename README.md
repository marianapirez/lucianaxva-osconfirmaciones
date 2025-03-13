<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Save the Date - XV de Luciana</title>
    <link href="https://fonts.googleapis.com/css2?family=Arapey:ital@0;1&display=swap" rel="stylesheet">
    <style>
        /* Estilos generales */
        body {
            font-family: 'Arapey', serif;
            text-align: center;
            background-color: #0d1828;
            color: #bdbdbd;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        /* Contenedor principal */
        .container {
            max-width: 450px;
            padding: 30px;
            background: rgba(13, 24, 40, 0.9);
            border-radius: 12px;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }

        /* Títulos y textos */
        h1 {
            font-size: 26px;
            margin-bottom: 10px;
            font-weight: normal;
        }

        p {
            font-size: 18px;
            line-height: 1.5;
        }

        /* Cuenta regresiva en una sola línea sin fondo */
        .countdown {
            font-size: 22px;
            font-weight: bold;
            margin-top: 15px;
            color: #bdbdbd;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Un evento mágico está por llegar!</h1>
        <p>Muy pronto recibirás todos los detalles… pero por ahora, guarda la fecha para mis XV años.</p>
        <p><strong>19 de abril de 2025 | 20:30 hs</strong></p>
        <div id="countdown" class="countdown"></div>
    </div>

    <script>
        // Establecer la fecha del evento
        const eventDate = new Date("April 19, 2025 20:30:00").getTime();

        // Actualizar la cuenta regresiva cada segundo
        const countdown = setInterval(function() {
            const now = new Date().getTime();
            const timeLeft = eventDate - now;

            // Calcular días, horas, minutos y segundos
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Mostrar la cuenta regresiva en una sola línea
            document.getElementById("countdown").textContent = 
                "Faltan " + days + " días " + hours + "h " + minutes + "m " + seconds + "s";

            // Cuando llegue el día de la fiesta
            if (timeLeft < 0) {
                clearInterval(countdown);
                document.getElementById("countdown").textContent = "¡Es el gran día!";
            }
        }, 1000);
    </script>
</body>
</html>
