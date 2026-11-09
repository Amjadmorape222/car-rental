$(document).ready(function() {
// إظهار وإخفاء تفاصيل السيارة
$('.show-details2').change(function() {
    $(this).closest('tr')
           .next('.extra-details2')
           .toggle(this.checked);
});

// إظهار نموذج الاستئجار
document.getElementById("continueBtn2")
    .addEventListener("click", function() {

        document.getElementById("rentalForm")
            .style.display = "block";

    });

// دالة حساب السعر
function calculatePrice() {

    let selectedCar = document.querySelector(
        '.select-car2:checked'
    );

    let start = document.getElementById("startDate").value;
    let end = document.getElementById("endDate").value;

    let days = 0;
    let dailyPrice = 0;
    let subtotal = 0;
    let discount = 0;
    let total = 0;

    // سعر السيارة اليومي
    if (selectedCar) {
        dailyPrice = Number(selectedCar.value);
    }

    // حساب أيام الاستئجار
    if (start && end) {

        let startDate = new Date(start + "T00:00:00");
        let endDate = new Date(end + "T00:00:00");

        let difference = endDate - startDate;

        if (difference >= 0) {
            days = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            ) + 1;
        }
    }

    // حساب السعر
    subtotal = days * dailyPrice;

    // خصم 10% إذا تجاوز الاستئجار 7 أيام
    if (days > 7) {
        discount = subtotal * 0.10;
    }

    total = subtotal - discount;

    // عرض النتائج
    document.getElementById("rentalDays").textContent = days;

    document.getElementById("dailyPrice").textContent =
        dailyPrice.toLocaleString();

    document.getElementById("discountAmount").textContent =
        discount.toLocaleString();

    document.getElementById("totalPrice").textContent =
        total.toLocaleString();
}

// عند اختيار سيارة
document.querySelectorAll(".select-car2")
    .forEach(function(car) {

        car.addEventListener("change", function() {

            if (this.checked) {

                document.querySelectorAll(".select-car2")
                    .forEach(function(otherCar) {

                        if (otherCar !== car) {
                            otherCar.checked = false;
                        }

                    });

            }

            calculatePrice();

        });

    });

// تحديث الحساب عند تغيير التواريخ
document.getElementById("startDate")
    .addEventListener("change", calculatePrice);

document.getElementById("endDate")
    .addEventListener("change", calculatePrice);
});