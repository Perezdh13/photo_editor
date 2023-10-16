import cv2
import numpy as np

def select_region_with_magic_wand(image_path, output_path, x, y, tolerance=10):
    # Cargar la imagen
    image = cv2.imread(image_path)

    # Crear una máscara inicial en blanco
    mask = np.zeros(image.shape[:2], dtype=np.uint8)

    # Definir los parámetros para la herramienta de selección automática
    flags = cv2.EVENT_FLAG_LBUTTON
    mode = cv2.RETR_EXTERNAL
    method = cv2.CHAIN_APPROX_SIMPLE

    # Llamar a la función de selección automática con la "varita mágica"
    cv2.grabCut(image, mask, (x - tolerance, y - tolerance, x + tolerance, y + tolerance), None, None, 5, cv2.GC_INIT_WITH_RECT)

    # Crear la máscara de selección
    mask2 = np.where((mask == 2) | (mask == 0), 0, 1).astype('uint8')

    # Aplicar la máscara a la imagen original
    result = image * mask2[:, :, np.newaxis]

    # Guardar la imagen resultante
    cv2.imwrite(output_path, result)

    # Mostrar la imagen seleccionada
    cv2.imshow('Selected Region', result)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

# Ejemplo de uso:
select_region_with_magic_wand('input.jpg', 'output.jpg', x=100, y=100, tolerance=10)
