from torchvision import transforms
from ts.torch_handler.image_classifier import ImageClassifier

MEAN = [0.485, 0.456, 0.406]
STD = [0.229, 0.224, 0.225]


class DogCatRabbitClassifier(ImageClassifier):
    image_processing = transforms.Compose(
        [
            transforms.Resize(size=224),
            transforms.CenterCrop(size=224),
            transforms.ToTensor(),
            transforms.Normalize(MEAN, STD),
        ]
    )
    topk = 3
