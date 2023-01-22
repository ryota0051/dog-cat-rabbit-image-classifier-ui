FROM pytorch/torchserve:0.7.0-cpu

ARG WORKDIR=/home/model-server/
ARG MODEL_STORE=${WORKDIR}model_store/
ARG MODEL_NAME=dog_vs_cat_vs_rabbit
ARG MODEL_VERSION=1.0

ENV MODEL_STORE=${MODEL_STORE}

WORKDIR ${WORKDIR}

COPY ./handler.py ./index_to_name.json ./ts_config.properties ./base_model/model.pt ${WORKDIR}

RUN mkdir ${MODEL_STORE} && torch-model-archiver --version ${MODEL_VERSION} \
    --extra-files ./index_to_name.json \
    --model-name ${MODEL_NAME} \
    --serialized-file model.pt \
    --handler handler.py && \
    mv ${MODEL_NAME}.mar ${MODEL_STORE}

CMD ["torchserve", "--start", "--model-store", "${MODEL_STORE}", "--ts-config", "ts_config.properties"]
