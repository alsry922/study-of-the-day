import * as tf from "@tensorflow/tfjs";

const studySection = document.querySelector(".study-section");
const modelBtn = document.querySelector(".model-btn");
const predictionBtn = document.querySelector(".prediction-btn");
const predictTime = document.querySelector(".predict-part__time");

modelBtn.addEventListener("click", handleModel);
predictionBtn.addEventListener("click", handlePredict);

async function handleModel() {
  const userId = studySection.dataset.userId;
  // user 정보 가져옴
  const response = await fetch(`/apis/${userId}/studies/model`, {
    method: "get",
  });
  const result = await response.json();
  const { user } = result;
  console.log(user);
  // user 정보 안에 있는 completions 2차원 배열로 만듦
  const finishCauses = user.completions.map((study) => {
    return [study.level, study.volume];
  });
  const finishResults = user.completions.map((study) => {
    return study.finishTime;
  });

  const model = createModel();
  await trainModel(finishCauses, finishResults, model);
  await model.save("localstorage://my-model");
  alert("완료되었습니다.");
}

function createModel() {
  // 모델 모양
  const X = tf.input({ shape: [2] });
  const Y = tf.layers.dense({ units: 1 }).apply(X);
  return tf.model({ inputs: X, outputs: Y });
}

async function trainModel(finishCauses, finishResults, model) {
  const causes = tf.tensor(finishCauses);
  const results = tf.tensor(finishResults);

  const compileParam = {
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ["mse"],
  };
  model.compile(compileParam);

  const fitParam = {
    epochs: 40000,
    // callbacks: {
    //   onEpochEnd: function (epochs, logs) {
    //     console.log(`epochs ${epochs}, ${Math.sqrt(logs.loss)}`);
    //   },
    // },
    callbacks: [
      tf.callbacks.earlyStopping({
        monitor: "mse",
      }),
      new tf.CustomCallback({
        onEpochEnd: function (epochs, logs) {
          console.log(`epochs ${epochs}, ${Math.sqrt(logs.loss)}`);
        },
      }),
    ],
  };

  await model.fit(causes, results, fitParam);
  // 모델 훈련
  // while (true) {
  //   const result = await model.fit(causes, results, fitParam);
  //   const loss = result.history.loss;
  //   if (loss[loss.length - 2] - loss[loss.length - 1] < 0.0001) break;
  // }
}

async function handlePredict() {
  const userId = studySection.dataset.userId;
  // user 정보 가져옴
  const response = await fetch(`/apis/${userId}/studies/predict`, {
    method: "get",
  });
  const { user } = await response.json();
  let model;
  try {
    model = await tf.loadLayersModel("localstorage://my-model");
  } catch (error) {
    alert("Model 을 먼저 생성해주세요");
    return;
  }
  // 모델의 가중치와 편향
  const weights = model.getWeights();
  console.log(`weight: ${await weights[0].array()}`);
  console.log(`bias: ${await weights[1].array()}`);
  const forPrediction = user.incompletions.map((study) => {
    return [study.level, study.volume];
  });
  const causes = tf.tensor(forPrediction);
  const results = await model.predict(causes).array();
  console.log(results);
  const timePredictedList = await results.map((item) => item[0]);
  const finishTime = timePredictedList
    .reduce((acc, cur) => acc + cur)
    .toFixed();

  const finishTimeText = predictTime.querySelector("span");
  finishTimeText.innerText =
    finishTime >= 60
      ? `${parseInt(finishTime / 60)}시간 ${finishTime % 60}분`
      : `${finishTime}분`;
}
