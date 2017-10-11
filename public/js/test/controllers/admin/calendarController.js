var CalendarController = CalendarController || {};

CalendarController = {
    init: function () {
        $(".c_date").parent().click(CalendarController.events.update);
        $("#btnMakeHoliday").click(CalendarController.events.makeHoliday);
    },
    events: {
        update: function (event) {
            event.preventDefault();

            var data = {
                year: $(this).data('year'),
                month: $(this).data('month'),
                day: $(this).data('day'),
                isHoliday: $(this).attr('class') == 'hday',
            };

            var form = $('#__AjaxAntiForgeryForm');
            var token = $('input[name="__RequestVerificationToken"]', form).val();

            CommonSettings.events.showProcessingOverlay();
            $.ajax({
                url: "/Calendar/UpdateHoliday",
                type: "POST",
                data: {
                    __RequestVerificationToken: token,
                    viewModel: data
                },
                success: function () {
                    window.location.reload();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function () {
                    window.location.reload();
                    CommonSettings.events.hideProcessingOverlay();
                }
            });

            return false;
        },
        makeHoliday: function (event) {
            event.preventDefault();

            var form = $('#__AjaxAntiForgeryForm');
            var token = $('input[name="__RequestVerificationToken"]', form).val();

            CommonSettings.events.showProcessingOverlay();
            $.ajax({
                url: "/Calendar/MakeHoliday",
                type: "POST",
                data: {
                    __RequestVerificationToken: token,
                    year: $("#Year").val(),
                    month: $("#Month").val(),
                },
                success: function () {
                    window.location.reload();
                    CommonSettings.events.hideProcessingOverlay();
                },
                error: function () {
                    window.location.reload();
                    CommonSettings.events.hideProcessingOverlay();
                }
            });

            return false;
        }
    }
}

$(document).ready(function () {
    CalendarController.init();
});