<template>
  <div>
    <div class="row justify-content-center m-0 p-0">
      <div class="col-12 col-sm-8 m-0 p-0">
        <div class="row">
          <div class="col-12">
            <div class="me-4">
              <h4 class="fw-bold text-center me-3 pt-5">
                {{ t("FAQ") }}
              </h4>
            </div>
            <div id="accordionExample" class="accordion">
              <div class="accordion-item">
                <h2 id="headingOne" class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    {{ t("question1") }}
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <p>
                      {{ t("answer_part_1") }}
                      <br>{{ t("answer_part_2") }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingTwo" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    {{ t("question_2") }}
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    {{ t("answer_2") }} 01
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingThree" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {{ t("question_3") }}
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    {{ t("answer_3") }}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingFour" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {{ t("question_4") }}
                  </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    {{ t("answer_4") }}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingFive" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {{ t("question_5") }}
                  </button>
                </h2>
                <div id="collapseFive" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    {{ t("answer_5") }}
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 id="headingsix" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsesix"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {{ t("question_6") }}
                  </button>
                </h2>
                <div id="collapsesix" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    {{ t("answer_6") }}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingsaven" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseseven"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {{ t("question_7") }}
                  </button>
                </h2>
                <div id="collapseseven" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    {{ t("answer_7") }}
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingeight" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseeight"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {{ t("question_8") }}
                  </button>
                </h2>
                <div id="collapseeight" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <ol class="px-0 mx-0">
                      <li>{{ t("answer_8_1") }}</li>
                      <li>{{ t("answer_8_2") }}</li>
                      <li>{{ t("answer_8_3") }}</li>
                      <li>{{ t("answer_8_4") }}</li>
                    </ol>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 id="headingnine" class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapsenine"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    {{ t("question_9") }}
                  </button>
                </h2>
                <div id="collapsenine" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    {{ t("answer_9") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Subscription',
  setup () {
    const { t } = useI18n()
    const localePath = useLocalePath()
    return { t, localePath }
  }
}
</script>

<style scoped>
.accordion-item {
  border: none;
}
.accordion-button{
  padding-left: 0;
  padding-right: 0;
}
.accordion-button:not(.collapsed) {
  color: black;
  box-shadow: none;
}
.accordion-button:focus {
  z-index: 3;
  border:none;
  outline: 0;
  box-shadow: none;
}
.accordion-button:not(.collapsed) {
  background-color: white;
  box-shadow: none;
}
</style>
