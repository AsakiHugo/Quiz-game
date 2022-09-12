const start_btn = document.querySelector(".start_page .start_btn");
const continue_btn = document.querySelector(".continue_btn");
const exit_btn = document.querySelector(".exit_btn");
const next_btn = document.querySelector(".next_btn");
const quit_btn = document.querySelector(".quit_btn");
const rule_page = document.querySelector(".rule_page");
const quiz_box = document.querySelector(".quiz_box");
const result_page = document.querySelector(".result_page");
const quiz_options = document.querySelector(".quiz_options");
const count_time = document.querySelector(".quiz_box .timer span");
const time_line = document.querySelector(".quiz_box header .time_line");
const score = document.querySelector(".result");

let quiz_count = 0;
let no_count = 1;
let counter;
let counter_line;
let time_value = 15;
let line_value = 0;
let user_score = 0;

start_btn.addEventListener ("click", () => {
    rule_page.classList.add ("active")
})

exit_btn.addEventListener ("click", () => {
    rule_page.classList.remove ("active")
})

continue_btn.addEventListener ("click", () => {
    rule_page.classList.remove ("active");
    quiz_box.classList.add ("active");
    show_questions(0);
    que_count(1);
    start_timer(15);
    start_line(0);
})

next_btn.addEventListener ("click", () => {
    if(quiz_count < questions.length - 1) {
        quiz_count++;
        no_count++;
        show_questions(quiz_count);
        que_count(no_count);
        clearInterval(counter)
        start_timer(time_value);
        clearInterval(counter_line)
        start_line(line_value);
        next_btn.style.display = "none";
    } else {
        show_result();
    }
})

quit_btn.addEventListener ("click", () => {
    window.location.reload();
})

let show_questions = (index) => {
    const quiz_ques = document.querySelector(".quiz_question");
    let quiz_text = "<span>" + questions[index].number + ". " + questions[index].question + "</span>";
    let quiz_option_tag = '<div class="options"><span>' + questions[index].option[0] + '</span></div>' 
                          + '<div class="options"><span>' + questions[index].option[1] + '</span></div>'
                          + '<div class="options"><span>' + questions[index].option[2] + '</span></div>'
                          + '<div class="options"><span>' + questions[index].option[3] + '</span></div>'

    quiz_ques.innerHTML = quiz_text;
    quiz_options.innerHTML = quiz_option_tag;

    const option_list = quiz_options.querySelectorAll(".options");
    for(let i = 0; i < option_list.length; i++) {
        option_list[i].setAttribute("onclick", "selectedans(this)")
    }
}

let correct_icon = '<i class="correct fa-regular fa-circle-xmark"></i>';
let wrong_icons = '<i class="wrong fa-regular fa-circle-check"></i>';

function selectedans(ans) {
    let user_ans = ans.textContent;
    let correct_ans = questions[quiz_count].answer;
    clearInterval(counter);
    clearInterval(counter_line);
    if(user_ans == correct_ans) {
        user_score += 1;
        ans.classList.add("correct")
        ans.insertAdjacentHTML("beforeend", wrong_icons)
    } else {
        ans.classList.add("incorrect")
        ans.insertAdjacentHTML("beforeend", correct_icon)

        for (let i = 0; i < 4; i++) {
            if (quiz_options.children[i].textContent == correct_ans) {
                quiz_options.children[i].setAttribute("class", ("options correct"))
                quiz_options.children[i].insertAdjacentHTML("beforeend", wrong_icons)
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        quiz_options.children[i].classList.add("disabled")
    }

    next_btn.style.display = "block";
}

let que_count = (index) => {
    const total_quze = document.querySelector(".total_quze");
    let quiz_no_tag = '<p><span>' + index + '</span> of <span>' + questions.length +'</span> questions</p>';
    total_quze.innerHTML = quiz_no_tag;
}


let start_timer = (time) => {
    counter = setInterval(timer, 1000)
    function timer(){
        count_time.textContent = time;
        time--;
        if (time < 0) {
            clearInterval(counter);
            count_time.textContent = "0";

            let correct_ans = questions[quiz_count].answer;

            for (let i = 0; i < 4; i++) {
                if (quiz_options.children[i].textContent == correct_ans) {
                    quiz_options.children[i].setAttribute("class", ("options correct"))
                    quiz_options.children[i].insertAdjacentHTML("beforeend", wrong_icons)
                }
            }

            for (let i = 0; i < 4; i++) {
                quiz_options.children[i].classList.add("disabled")
            }
        
            next_btn.style.display = "block";
        }
    }
}

let start_line = (time) => {
    counter_line = setInterval(timer, 32)
    function timer(){
        time++;
        time_line.style.width = time + "px";
        if (time > 398) {
            clearInterval(counter_line);
            count_time.textContent = "0";
        }
    }
}

function show_result() {
    rule_page.classList.remove ("active");
    quiz_box.classList.remove ("active");
    result_page.classList.add ("active");
    score.innerHTML = 'You got <span>' + user_score + '</span> out of <span>' + questions.length + '</span>';
}