<template>
    <div class="app-footer-comp panel panel-default">
        <div class="panel-body row">
            <div class="col-xs-6 col-sm-4">
                version 0.0.0
            </div>
            <div class="footer-center col-xs-6 col-sm-4">
                copyright &copy; 2017 Cody Thompson 
            </div>
        </div>
    </div>
</template>

<style scoped>

.app-footer-comp .footer-center {
    text-align: right;
}
@media (min-width: 768px) {
    .app-footer-comp .footer-center {
        text-align: center;
    }
}
</style>

<script>
export default {
    name: 'AppFooter'
}
</script>