document.addEventListener('DOMContentLoaded', () => {
    const servicesGrid = document.getElementById('services-grid');
    const orderSection = document.getElementById('order-section');
    const selectedServicesList = document.getElementById('selected-services-list');
    const totalAmountSpan = document.getElementById('total-amount');
    const formServicesList = document.getElementById('form-services-list');
    const formTotalAmount = document.getElementById('form-total-amount');
    const policyAgreeCheckbox = document.getElementById('policy-agree');
    const submitButton = document.getElementById('submit-button');
    const languageSwitcher = document.getElementById('languageSwitcher');
    const htmlElement = document.documentElement;

    // --- Language Switching Logic ---
    let isRTL = htmlElement.getAttribute('dir') === 'rtl';

    const translations = {
        'ar': {
            'English': 'English',
            'MonzirGraphix': 'MonzirGraphix',
            'خدمات التصميم الاحترافية': 'خدمات التصميم الاحترافية',
            'تصاميم عالية الجودة بأسعار منافسة': 'تصاميم عالية الجودة بأسعار منافسة',
            'ملخص طلبك': 'ملخص طلبك',
            'المجموع:': 'المجموع:',
            'سياسات العمل': 'سياسات العمل',
            'أقر بموافقتي على سياسات العمل المذكورة أعلاه.': 'أقر بموافقتي على سياسات العمل المذكورة أعلاه.',
            'إرسال الطلب': 'إرسال الطلب',
            'الاسم الكامل': 'الاسم الكامل',
            'رقم الهاتف أو البريد الإلكتروني': 'رقم الهاتف أو البريد الإلكتروني',
            'All prices are in USD and are final.': 'جميع الأسعار بالدولار الأمريكي وهي نهائية.',
            'The client must provide all necessary content (texts, images, logos) before starting the design.': 'يجب على العميل توفير جميع المحتويات اللازمة (نصوص، صور، شعارات) قبل البدء في التصميم.',
            'The number of revisions is limited to two for each design. Additional revisions may incur extra charges.': 'عدد المراجعات (Revisions) محدود باثنتين لكل تصميم. قد تترتب رسوم إضافية على المراجعات الإضافية.',
            'Delivery time will be agreed upon with the client and depends on the complexity of the design.': 'يتم الاتفاق على وقت التسليم مع العميل ويعتمد على مدى تعقيد التصميم.',
            'The client must approve the final design before receiving the final files.': 'يجب على العميل الموافقة على التصميم النهائي قبل استلام الملفات النهائية.',
            'Payment terms will be agreed upon after submitting the request.': 'سيتم الاتفاق على شروط الدفع بعد تقديم الطلب.',
            'Email: info@monzirgraphix.com': 'البريد الإلكتروني: info@monzirgraphix.com',
            'Phone: +966 50 123 4567': 'الهاتف: +966 50 123 4567',
            '&copy; 2025 MonzirGraphix. جميع الحقوق محفوظة.': '&copy; 2025 MonzirGraphix. جميع الحقوق محفوظة.',
        },
        'en': {
            'English': 'Arabic',
            'MonzirGraphix': 'MonzirGraphix',
            'خدمات التصميم الاحترافية': 'Professional Design Services',
            'تصاميم عالية الجودة بأسعار منافسة': 'High quality designs at competitive prices',
            'ملخص طلبك': 'Your Order Summary',
            'المجموع:': 'Total:',
            'سياسات العمل': 'Work Policies',
            'أقر بموافقتي على سياسات العمل المذكورة أعلاه.': 'I agree to the work policies.',
            'إرسال الطلب': 'Submit Order',
            'الاسم الكامل': 'Full Name',
            'رقم الهاتف أو البريد الإلكتروني': 'Phone Number or Email',
            'All prices are in USD and are final.': 'All prices are in USD and are final.',
            'The client must provide all necessary content (texts, images, logos) before starting the design.': 'The client must provide all necessary content (texts, images, logos) before starting the design.',
            'The number of revisions is limited to two for each design. Additional revisions may incur extra charges.': 'The number of revisions is limited to two for each design. Additional revisions may incur extra charges.',
            'Delivery time will be agreed upon with the client and depends on the complexity of the design.': 'Delivery time will be agreed upon with the client and depends on the complexity of the design.',
            'The client must approve the final design before receiving the final files.': 'The client must approve the final design before receiving the final files.',
            'Payment terms will be agreed upon after submitting the request.': 'Payment terms will be agreed upon after submitting the request.',
            'Email: info@monzirgraphix.com': 'Email: info@monzirgraphix.com',
            'Phone: +966 50 123 4567': 'Phone: +966 50 123 4567',
            '&copy; 2025 MonzirGraphix. جميع الحقوق محفوظة.': '&copy; 2025 MonzirGraphix. All rights reserved.',
        }
    };

    function updateContent(lang) {
        const elements = document.querySelectorAll('[data-ar], [data-en], [data-ar-name], [data-en-name], [data-ar-policy], [data-en-policy], [data-en-placeholder], [data-ar-placeholder]');
        const targetLang = lang === 'ar' ? 'ar' : 'en';
        const sourceLang = lang === 'ar' ? 'en' : 'ar';

        elements.forEach(el => {
            // Update text content
            if (el.hasAttribute(`data-${targetLang}`)) {
                el.textContent = el.getAttribute(`data-${targetLang}`);
            }
            
            // Update placeholder
            if (el.hasAttribute(`data-${targetLang}-placeholder`)) {
                el.placeholder = el.getAttribute(`data-${targetLang}-placeholder`);
            }

            // Update policy list
            if (el.id === 'policy-section') {
                const policyList = el.querySelector('ul');
                if (policyList) {
                    const policyText = policyList.getAttribute(`data-${targetLang}-policy`);
                    if (policyText) {
                        // Simple way to update list items based on the attribute content
                        // Set the innerHTML directly from the data attribute, which contains the <li> elements.
                        // We need to trim the content to remove leading/trailing whitespace/newlines from the attribute value.
                        policyList.innerHTML = policyText.trim();
                    }
                }
            }
        });

        // Update language switcher text
        const switcherText = languageSwitcher.querySelector('span');
        switcherText.textContent = switcherText.getAttribute(`data-${sourceLang}`);
    }

    function switchLanguage() {
        isRTL = !isRTL;
        const lang = isRTL ? 'ar' : 'en';
        htmlElement.setAttribute('lang', lang);
        htmlElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
        updateContent(lang);
        updateOrderSummary(); // Update summary to reflect language change
    }

    languageSwitcher.addEventListener('click', switchLanguage);

    // Initial content update based on current HTML state
    updateContent(isRTL ? 'ar' : 'en');

    // --- Service Selection and Calculation Logic ---
    const serviceCards = document.querySelectorAll('.service-card');
    const selectedServices = new Map(); // Map to store {id: {name, price}}

    function updateOrderSummary() {
        let total = 0;
        selectedServicesList.innerHTML = '';
        const currentLang = htmlElement.getAttribute('lang');
        const servicesForForm = [];

        if (selectedServices.size > 0) {
            orderSection.style.display = 'block';
            selectedServices.forEach((service, id) => {
                total += service.price;
                const listItem = document.createElement('li');
                const serviceName = currentLang === 'ar' ? service.arName : service.enName;
                listItem.innerHTML = `
                    <span>${serviceName}</span>
                    <span>$${service.price}</span>
                `;
                selectedServicesList.appendChild(listItem);
                servicesForForm.push(`${serviceName} ($${service.price})`);
            });
        } else {
            orderSection.style.display = 'none';
        }

        totalAmountSpan.textContent = `$${total}`;
        formTotalAmount.value = total;
        formServicesList.value = servicesForForm.join(' | ');

        // Enable/Disable submit button
        checkFormValidity();
    }

    function handleServiceClick(event) {
        const card = event.currentTarget;
        const checkbox = card.querySelector('.service-checkbox');
        
        // Toggle checkbox state
        checkbox.checked = !checkbox.checked;
        
        const serviceId = card.dataset.serviceId;
        const price = parseFloat(card.dataset.price);
        const arName = card.dataset.arName;
        const enName = card.dataset.enName;

        if (checkbox.checked) {
            card.classList.add('selected');
            selectedServices.set(serviceId, { price, arName, enName });
        } else {
            card.classList.remove('selected');
            selectedServices.delete(serviceId);
        }

        updateOrderSummary();
    }

    serviceCards.forEach(card => {
        // Add click listener to the card itself
        card.addEventListener('click', handleServiceClick);
        
        // Prevent card click from toggling the checkbox twice if the checkbox itself is clicked
        const checkbox = card.querySelector('.service-checkbox');
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation(); // Stop the event from bubbling up to the card handler
            // The handleServiceClick logic will be executed by the card click handler, 
            // but since we stop propagation here, we need to manually update the state
            // if the user clicks the checkbox directly.
            
            const serviceId = card.dataset.serviceId;
            const price = parseFloat(card.dataset.price);
            const arName = card.dataset.arName;
            const enName = card.dataset.enName;

            if (checkbox.checked) {
                card.classList.add('selected');
                selectedServices.set(serviceId, { price, arName, enName });
            } else {
                card.classList.remove('selected');
                selectedServices.delete(serviceId);
            }
            updateOrderSummary();
        });
    });

    // --- Form Validation Logic ---
    const orderForm = document.getElementById('order-form');
    const formInputs = orderForm.querySelectorAll('input[required]:not([type="hidden"])');

    function checkFormValidity() {
        const isPolicyAgreed = policyAgreeCheckbox.checked;
        const isAnyServiceSelected = selectedServices.size > 0;
        let areInputsFilled = true;

        formInputs.forEach(input => {
            if (!input.value) {
                areInputsFilled = false;
            }
        });

        // The button is enabled only if:
        // 1. At least one service is selected (to show the form).
        // 2. All required inputs are filled.
        // 3. The policy agreement checkbox is checked.
        if (isAnyServiceSelected && areInputsFilled && isPolicyAgreed) {
            submitButton.removeAttribute('disabled');
        } else {
            submitButton.setAttribute('disabled', 'disabled');
        }
    }

    // Attach event listeners for form validation
    formInputs.forEach(input => {
        input.addEventListener('input', checkFormValidity);
    });
    policyAgreeCheckbox.addEventListener('change', checkFormValidity);

    // Initial check to set the button state
    checkFormValidity();
});
