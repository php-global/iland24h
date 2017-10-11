var CommonSettings = CommonSettings || {};

CommonSettings = {
    model: {
        datepickerOptions: { clearBtn: true, format: "yyyy/mm/dd", language: "ja" },
        errorArray: []
    },
    init: function () {
        // apply maxlength property for input
        $("input[data-val-maxlength-max]").each(function (index, element) {
            var length = parseInt($(this).attr("data-val-maxlength-max"));
            $(this).prop("maxlength", length);
        });
    },

    events: {
        showProcessingOverlay: function () {
            $('#processingOverlay').fadeIn('fast');
        },

        hideProcessingOverlay: function () {
            $('#processingOverlay').fadeOut();
        },

        setValueToDisabledInput: function (id, value) {
            $('#' + id).val(value);
            $('#' + id + '[type=hidden]').val(value);
        },

        clearValueFromDisabledInput: function (id, value) {
            $('#' + id).val('');
            $('#' + id + '[type=hidden]').val('');
        },

        isValidHalfSize: function (val) {
            var regex = /^[0-9a-zA-Z]*$/;
            return regex.test(val);
        },

        isValidSubmit: function() {
            return CommonSettings.model.errorArray.length == 0;
        },

        resetErrorArray: function(val) {
            var index = CommonSettings.model.errorArray.indexOf(val);

            if (index > -1) {
                CommonSettings.model.errorArray.splice(index, 1);
            }
        },

        addErrorArray: function(val) {
            if (CommonSettings.model.errorArray.indexOf(val) < 0)
                CommonSettings.model.errorArray.push(val);
        },

        getQueryStringParams: function (name, url) {
            if (url != null)
                url = url.substring(url.indexOf('?') + 1);
            else
                url = window.location.search.substring(1);

            var sURLVariables = url.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == name) {
                    return sParameterName[1];
                }
            }
        },

        formatDigits: function (data) {
            return data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    },

    errorMessages: {
        OrderGetAdmin: "営業担当者コードが正しくないです。",
        OrderGetCustomer: "得意先コードが正しくないです。",
        ViewDateInvalid: "「公開日」の大小関係が不正です。",
        OrderBoxQuantityRequired: "箱数は必須です。",
        OrderBoxQuantityHalfSize: "箱数は半角数字で入力してください。",
        OrderBoxQuantityRange: "箱数は〇〇～××で入力してください。",
        OrderQuantityRequired: "本数は必須です。",
        OrderQuantityHalfSize: "本数は半角数字で入力してください。",
        OrderQuantityRange: "本数は〇〇～××で入力してください。",
        OrderQuantityCannotDivide: "入数で割り切れる数値を入力してください。"
    }
}

$(document).ready(function () {
    CommonSettings.init();
});