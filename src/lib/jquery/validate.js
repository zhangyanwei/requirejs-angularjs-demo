define(["lib/jquery/validate/jquery.validate.min"], function () {

    jQuery.validator.methods.phone = function (value, element) {
        return this.optional(element) || /^(1[3578][0-9]{9}|(\d{3,4}-)\d{7,8}(-\d{1,4})?)$/.test(value);
    };
    jQuery.validator.methods.mobile = function (value, element) {
        return this.optional(element) || /^1[3578][0-9]{9}$/.test(value);
    };
    jQuery.validator.methods.password = function (value, element) {
        return this.optional(element) || /^[\s\S]{6,20}$/.test(value);
    };
    jQuery.validator.methods.username = function (value, element) {
        return this.optional(element) || /^[a-zA-Z][\w.]{3,18}$/.test(value);
    };
    jQuery.validator.methods.nospecialchars = function (value, element) {
        return this.optional(element) || /^[^-!$%^&*()_+|~=`{}\[\]:/;<>?,.@#'"\\]{1,20}$/.test(value);
    };
    jQuery.validator.methods.email = function (value, element) {
        return this.optional(element) || /^[^@\s]+@(?:[^@\s.]+)(?:\.[^@\s.]+)+$/.test(value);
    };
    jQuery.validator.methods.decimal = function (value, element, param) {
        var size = param || 2;
        return this.optional(element) || new RegExp("^\\d+(?:\\.\\d{1,{0}})?$".format(size)).test(value);
    };
    jQuery.validator.methods.nonword = function (value, element, param) {
        var range = param || [2, 4];
        return this.optional(element) || new RegExp("^\\W{{0},{1}}$".format(range)).test(value);
    };
    jQuery.validator.methods.realname = function (value, element, param) {
        return this.optional(element) || /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/.test(value);
    };
    jQuery.validator.methods.idNumber = function (value, element) {
        return this.optional(element) || /(?:^\d{15}$)|(?:^\d{17}(?:\d|[Xx])$)/.test(value);
    };
    jQuery.validator.methods.ajax = function (value, element, param, method) {
        if (this.optional(element)) {
            return "dependency-mismatch";
        }

        method = typeof method === "string" && method || "ajax";

        var previous = this.previousValue(element, method),
            validator, data, optionDataString;

        if (!this.settings.messages[element.name]) {
            this.settings.messages[element.name] = {};
        }
        previous.originalMessage = previous.originalMessage || this.settings.messages[element.name][method];
        this.settings.messages[element.name][method] = previous.message;

        param = typeof param === "string" && {url: param} || param;
        optionDataString = $.param($.extend({data: value}, param.data));
        if (previous.old === optionDataString) {
            return previous.valid;
        }

        previous.old = optionDataString;
        validator = this;
        this.startRequest(element);

        data = {};
        data[element.name] = value;

        var copyOpts = $.extend(true, {
            mode: "abort",
            port: "validate" + element.name,
            dataType: "json",
            data: data,
            context: validator.currentForm,
            success: function (response) {
                var valid = response === true || response === "true",
                    errors, message, submitted;

                validator.settings.messages[element.name][method] = previous.originalMessage;
                if (valid) {
                    submitted = validator.formSubmitted;
                    validator.resetInternals();
                    validator.toHide = validator.errorsFor(element);
                    validator.formSubmitted = submitted;
                    validator.successList.push(element);
                    validator.invalid[element.name] = false;
                    validator.showErrors();
                } else {
                    errors = {};
                    message = response || validator.defaultMessage(element, {method: method, parameters: value});
                    errors[element.name] = previous.message = message;
                    validator.invalid[element.name] = true;
                    validator.showErrors(errors);
                }
                previous.valid = valid;
                validator.stopRequest(element, valid);
            }
        }, param);

        copyOpts.data = typeof param.data === "function" && JSON.stringify(param.data()) || param.data || {};
        $.ajax(copyOpts);
        return "pending";
    };
    jQuery.validator.methods.layout = function (value, element, param) {
        if (!this.optional(element)) {
            var regex = /^\d+$/;
            for (var i = 0; i < param.length; i++) {
                var target = $(param[i]);
                if (this.settings.onfocusout && target.not(".validate-layout-blur").length) {
                    target.addClass("validate-layout-blur").on("blur.validate-layout", function () {
                        $(element).valid();
                    });
                }
                if (!regex.test(target.val())) {
                    return false;
                }
            }

            return regex.test(value);
        }
        return "dependency-mismatch";
    };
    jQuery.validator.methods.storey = function (value, element, param) {
        if (!this.optional(element)) {
            var target = $(param);
            if (this.settings.onfocusout && target.not(".validate-storey-blur").length) {
                target.addClass("validate-storey-blur").on("blur.validate-storey", function () {
                    $(element).valid();
                });
            }
            return Number(target.val()) >= Number(value);
        }
        return "dependency-mismatch";
    };
    jQuery.validator.methods.location = function (value, element, param) {
        if (!this.optional(element)) {
            var target = $(param);
            if (this.settings.onfocusout && target.not(".validate-location-change").length) {
                target.addClass("validate-location-change").on("change.validate-location", function () {
                    $(element).valid();
                });
            }
            return !!target.val();
        }
        return "dependency-mismatch";
    };
    jQuery.validator.setDefaults({
        errorElement: "small",
        errorPlacement: function (error, element) {
            if (element.prop("type") === "checkbox") {
                error.insertAfter(element.parent("label"));
            } else {
                var parent = element.closest(".form-group");
                parent.length || (parent = element.parent());
                $(parent).append(error);
            }
        },
        success: function (label, element) {
            // Add the span element, if doesn't exists, and apply the icon classes to it.
            // if (!$(element).next( "span" )[0] ) {
            //     $("<span class='glyphicon glyphicon-ok form-control-feedback'></span>").insertAfter($(element));
            // }
        },
        highlight: function (element, errorClass, validClass) {
            $(element).closest(".form-group").addClass("has-error");
            // $(element).closest("form").addClass("invalid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest(".form-group").removeClass("has-error");
            // this.numberOfInvalids() == 0 && $(element).closest("form").removeClass("invalid");
        },
        destroy: function () {
            this.resetForm();
            $(this.currentForm).off(".validate")
                    .removeData("validator")
                .find(".validate-equalTo-blur")
                    .off(".validate-equalTo")
                    .removeClass("validate-equalTo-blur")
                .find(".validate-layout-blur")
                    .off(".validate-layout")
                    .removeClass("validate-layout-blur")
                .find(".validate-storey-blur")
                    .off(".validate-storey")
                    .removeClass("validate-storey-blur")
                .find(".validate-location-change")
                    .off(".validate-location")
                    .removeClass("validate-location-change");
        }
    });

    var originalInit = jQuery.validator.prototype.init;
    jQuery.validator.prototype.init = function () {
        $( this.currentForm ).on("validate", "input:hidden", function() {
            $(this).valid();
        });
        originalInit.call(this);
    };

    jQuery.validator.prototype.clearErrors = function (selector) {
        this.resetElements(selector);
        $(selector).each(function() {
            $("#" + $(this).attr("aria-describedby")).remove();
        });
    };

    jQuery.validator.prototype.formElements = function (selector) {
        var _this = this, valid = true;
        $(selector).map(function(i, element) {
            valid &= _this.element(element);
        });
        return valid;
    };

    jQuery.extend(jQuery.validator.messages, {
        required: "必填项",
        minlength: jQuery.validator.format(" 请最少输入{0}个字符"),
        maxlength: jQuery.validator.format(" 请最多输入{0}个字符"),
        rangelength: jQuery.validator.format(" 请输入{0}到{1}个字符"),
        digits:"请输入整数",
        layout:"户型不正确",
        storey:"楼层不正确",
        decimal: "请输入正确的数字,最多保留{0}位小数",
        nospecialchars: "不允许包含特殊字符",
        nonword: "不能包含字母和数字，以及\"_\"",
        idNumber: "身份证号码不正确",
        phone:"电话号码不正确",
        mobile:"手机号码不正确",
        email: "邮箱不正确",
        password: "请输入6到20位的密码",
        realname: "姓名格式不正确",
        location: "请点在地图中标记位置",
        number:"请输入正确数字"
    });

    return jQuery;
});