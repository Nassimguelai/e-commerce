package poc.product.services;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@Service
public class ImageService {

    @Value("${product.image.directory}")
    private String imageDirectory;

    public String saveImage(MultipartFile image, Long productId) {

        String fileName = productId + "_" + image.getOriginalFilename();
        String imagePath = imageDirectory + File.separator + fileName;
        try {
            image.transferTo(new File(imagePath));
            return fileName;
        } catch (IOException e) {
            // Handle exception
            return null;
        }
    }
}
