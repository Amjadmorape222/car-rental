$(document).ready(function() {
// 1- إظهار وإخفاء تفاصيل السيارة
$('.show-details2').change(function() {

    $(this).closest('tr')
           .next('.extra-details2')
           .toggle(this.checked);

});


// 2- إظهار نموذج الاستئجار عند الضغط على متابعة
$('#continueBtn2').click(function() {

    $('#rentalForm').show();

    $('#rentalForm')[0].scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

});


// 3- دالة حساب السعر
function calculatePrice() {

    let selectedCar = document.querySelector(
        '.select-car2:checked'
    );

    let start = $('#startDate').val();
    let end = $('#endDate').val();

    let days = 0;
    let dailyPrice = 0;
    let subtotal = 0;
    let discount = 0;
    let total = 0;

    // الحصول على سعر السيارة
    if (selectedCar) {
        dailyPrice = Number(selectedCar.value);
    }

    // حساب أيام الاستئجار
    if (start && end) {

        let startDate = new Date(start + 'T00:00:00');
        let endDate = new Date(end + 'T00:00:00');

        let difference = endDate - startDate;

        if (difference >= 0) {

            days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            ) + 1;

        }
    }

    // حساب السعر الأساسي
    subtotal = days * dailyPrice;

    // خصم 10% إذا تجاوز الاستئجار 7 أيام
    if (days > 7) {
        discount = subtotal * 0.10;
    }

    // حساب السعر النهائي
    total = subtotal - discount;

    // عرض النتائج
    $('#rentalDays').text(days);

    $('#dailyPrice').text(
        dailyPrice.toLocaleString()
    );

    $('#discountAmount').text(
        discount.toLocaleString()
    );

    $('#totalPrice').text(
        total.toLocaleString()
    );

}


// 4- اختيار سيارة واحدة فقط
$('.select-car2').change(function() {

    if (this.checked) {

        $('.select-car2').not(this).prop('checked', false);

    }

    calculatePrice();

});


// 5- تحديث الحساب عند تغيير التواريخ
$('#startDate, #endDate').change(function() {

    calculatePrice();

});


// 6- التحقق من نموذج الاستئجار عند الضغط على إرسال
$('#bookingForm').on('submit', function(e) {

    e.preventDefault();

    let form = this;

    // التأكد من اختيار سيارة
    let selectedCar = document.querySelector(
        '.select-car2:checked'
    );

    if (!selectedCar) {

        alert('يرجى اختيار سيارة أولاً');

        return;
    }


    // التحقق من الحقول المطلوبة
    if (!form.checkValidity()) {

        form.reportValidity();

        return;
    }


    // التحقق من الاسم الكامل
    let name = $('#fullName').val().trim();

    if (name === '') {

        alert('يرجى إدخال الاسم الكامل');

        return;
    }


    // التحقق من الرقم الوطني
    let nationalID = $('#nationalID').val();

    if (!/^[0-9]{11}$/.test(nationalID)) {

        alert('الرقم الوطني يجب أن يتكون من 11 رقماً');

        return;
    }


    // التحقق من رقم الموبايل
    let phone = $('#phone').val();

    if (!/^09[0-9]{8}$/.test(phone)) {

        alert('رقم الموبايل يجب أن يبدأ بـ 09 ويتكون من 10 أرقام');

        return;
    }


    // التحقق من التواريخ
    let start = $('#startDate').val();
    let end = $('#endDate').val();

    if (end < start) {

        alert('تاريخ نهاية التأجير يجب ألا يسبق تاريخ البداية');

        return;
    }


    // تحديث حساب السعر
    calculatePrice();


    // إظهار رسالة النجاح
    alert('تم التحقق من البيانات بنجاح! تم إرسال طلب الاستئجار.');

});
});