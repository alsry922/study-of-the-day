const $studySection = document.querySelector(".study-section");
const $studyList = document.querySelector(".study-list");
const $form = document.getElementById("study-form");
const $titleInput = document.getElementById("title-input");
const $levelInput = document.getElementById("level-input");
const $volumeInput = document.getElementById("volume-input");

$form.addEventListener("submit", handleSubmit);
$studyList.addEventListener("click", handleClick);

async function handleSubmit(event) {
  event.preventDefault();

  const title = $titleInput.value;
  const level = $levelInput.value;
  const volume = $volumeInput.value;
  const userId = $studySection.dataset.userId;

  const response = await fetch(`/apis/${userId}/studies`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ title, level, volume, owner: userId }),
  });
  if (response.status === 201) {
    const { studyId } = await response.json();
    addStudy(title, level, volume, studyId);
  } else {
    console.log("error");
  }
}

function addStudy(title, level, volume, studyId) {
  const li = document.createElement("li");
  const div1 = document.createElement("div");
  const p = document.createElement("p");
  const div2 = document.createElement("div");
  const input = document.createElement("input");
  const div3 = document.createElement("div");
  const finishBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  li.className = "study";
  li.dataset.studyId = studyId;
  div1.className = "study__title";
  p.innerText = `${title} 난이도: ${level} 페이지 수: ${volume}`;
  div2.className = "study__control";
  input.placeholder = "완료시간";
  div3.className = "control-btns";
  finishBtn.innerText = "완료";
  finishBtn.className = "finish-btn";
  removeBtn.innerText = "삭제";
  removeBtn.className = "remove-btn";

  div1.appendChild(p);
  div2.appendChild(input);
  div3.append(finishBtn, removeBtn);
  div2.appendChild(div3);
  li.appendChild(div1);
  li.appendChild(div2);
  $studyList.append(li);

  $titleInput.value = "";
  $levelInput.value = "";
  $volumeInput.value = "";
}

async function handleClick(event) {
  const target = event.target;
  const userId = $studySection.dataset.userId;

  if (target.matches(".finish-btn")) {
    // finish study
    const study = target.closest(".study");
    const studyId = study.dataset.studyId;
    const finishTimeInput = study.querySelector("input");

    if (finishTimeInput.value === "") return;

    const finishTime = finishTimeInput.value;
    const isFinished = true;
    const response = await fetch(`/apis/${userId}/studies/${studyId}`, {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ isFinished, finishTime }),
    });
    if (response.status === 200) {
      study.remove();
    }
  } else if (target.matches(".remove-btn")) {
    // remove study
    const study = target.closest(".study");
    const studyId = study.dataset.studyId;
    const response = await fetch(`/apis/${userId}/studies/${studyId}`, {
      method: "delete",
    });
    if (response.status === 200) {
      study.remove();
    }
  }
}
