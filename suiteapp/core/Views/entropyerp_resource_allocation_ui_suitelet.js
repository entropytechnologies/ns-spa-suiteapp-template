/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * Author: [Entropy Technologies] - Alejandro Barrera Aponte - (abarrera@entropy.cl)
 */
define([
    "N/https",
    "N/runtime",
    "N/ui/serverWidget",
    "N/ui/message",
    "N/log",
], function (
    https,
    runtime,
    serverWidget,
    message,
    log
) {
    function onRequest(context) {
        /**
         * Get the Frontend URL Params
         */
        var script = runtime.getCurrentScript();
        var frontend_url = script.getParameter({
            name: "custscript_eterp_frontend_url",
        });

        /**
         * Get the platform credentials, validate License Key and API Token
         * @type {string}
         */
        var api_token = "";
        var license_key = "";
        var platform_url = "";
        var environment = runtime.accountId;

        log.error("ID", environment);
        var access_granted = false;

        // TEMP
        access_granted = true;
        /**
         * In case access is confirmed
         */
        if (access_granted) {
            var response = https.get({
                url: frontend_url,
            });

            var html = response.body;

            /**
             * This line renders the full HTML in a full-page.
             */
            //context.response.write(html);

            /**
             * This block renders the SPA within a Netsuite page with Native Netsuite navigation
             * We either use this one of the block before.
             */
            var form = serverWidget.createForm({
                title: "EntropyERP - Resource Allocation",
            });
            var field = form.addField({
                id: "custpage_html_content",
                type: serverWidget.FieldType.INLINEHTML,
                label: "HTML Content",
            });
            field.defaultValue = html;
            context.response.writePage(form);
        } else {
            /**
             * In case access is denied.
             */
            log.error("Response", [
                validation_response.code,
                validation_body["active_organization"],
                validation_body["active_license"],
                validation_body["active_product"],
                validation_body["environment_match"],
            ]);

            var form = serverWidget.createForm({
                title: "EntropyERP - Resource Allocation",
            });

            form.addPageInitMessage({
                type: message.Type.WARNING,
                message: "Your License Key could not be verified.",
                duration: 0,
            });
            context.response.writePage(form);
        }
    }

    return {
        onRequest: onRequest,
    };
});