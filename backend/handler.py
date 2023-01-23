from PIL import Image
from torchvision import transforms
from ts.torch_handler.image_classifier import ImageClassifier

MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]
img_transforms = transforms.Compose(
    [
        transforms.Resize(size=224),
        transforms.CenterCrop(size=224),
        transforms.ToTensor(),
        transforms.Normalize(MEAN, STD),
    ]
)


class DogCatRabbitClassifier(ImageClassifier):
    topk = 3

    def image_processing(self, img: Image.Image):
        if img.mode != "RGB":
            img = img.convert("RGB")
        return img_transforms(img)
