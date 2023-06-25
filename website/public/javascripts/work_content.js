const company = "Assisted in the structural design and analysis of the building. <br> Conducted site visits to ensure construction compliance with design specifications";
const education = "Bachelors <br> Xyz Science <br> The Abc University <br> 2014-2018 <br> CGPA: 3.77";
const skills = "Structural Analysis <br> Structural Design <br> Building Codes and Regulations <br> AutoCAD <br> Finite Element Analysis <br> Building Information Modeling";

const title = {
    company: "Company <br> Global Engineering Solutions",
    education: "Education",
    skills: "Skills"
};

const content = {
    company,
    education,
    skills
};

document.addEventListener('DOMContentLoaded', function () {
    var work_box = document.querySelectorAll('.work_box');
    work_box.forEach(function (box) {

        for (let key in content) {
            if (box.id === key) {
                box.addEventListener('mouseenter', () => (box.innerHTML = content[key]));
                box.addEventListener('mouseleave', () => (box.innerHTML = title[key]));
            }
        }
    });
});



