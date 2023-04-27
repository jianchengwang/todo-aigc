import torch
from transformers import AutoTokenizer, AutoModel
print(torch.__version__)
print(torch.cuda.is_available())
tokenizer = AutoTokenizer.from_pretrained(
    "THUDM/chatglm-6b", cache_dir='/data/cache/huggingface', trust_remote_code=True)
model = AutoModel.from_pretrained(
    "THUDM/chatglm-6b", cache_dir='/data/cache/huggingface', trust_remote_code=True).half().cuda()
model = model.eval()
response, history = model.chat(
    tokenizer, "java unsafe", history=[])
print(response)