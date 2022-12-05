import AccordionComponent from "../UI/Accordion/AccordionComponent";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="faqs fade-in">
        <app-accordion data-title="ما الفائدة من استخدام المنصة؟">
            <div slot="content" class="p-2">
                <h2>المنصة تتيح للطلاب وحديثي التخرج من الثاموية العامة الحصول على اجابات لتساؤلاتهم من مصادر موثوقة.</h2>
            </div>
        </app-accordion>
        <app-accordion data-title="المشكلة التي تواجه خريجي الثانوية؟">
            <div slot="content" class="p-2">
                <h2>يوجد عدد كبير من التخصصات التي يمكن أن ينضم لها خريج الثانوية، مما يُحدث له معضلة في اتخاذ القرار ومعرفة ما اذا كان يناسبه.</h2>
            </div>
        </app-accordion>
        <app-accordion data-title="حل المشكلة المذكورة أعلاه">
            <div slot="content" class="p-2">
                <h2>نتيح امكانية الأسئلة والأجوبة لجميع التخصصات وغيرها من الأشياء التي يمكن أن يواجهها الخريج، وهذا يقلص تدريجياً من الخيارات التي يريدها ويؤكد له حسن اختياره لمساره الدراسي.</h2>
            </div>
        </app-accordion>
        <app-accordion data-title="هل أستطيع الاجابة على أسئلة غيري؟">
            <div slot="content" class="p-2">
                <h2>نعم. ولمعرفة مصدر الاجابة، نضع اسم المستخدم المجاوب وما اذا كان جامعياً او خريجاً من الثانوية آخر لإضافة خبرة المجاوب وسياق إجابته.</h2>
            </div>
        </app-accordion>
    </div>
`;
return template;
}

export default class FaqsComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        
    }

    disconnectedCallback() {

    }
}