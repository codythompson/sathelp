<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            Calculated Transfer Orbit
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-xs-4 col-sm-3 col-md-4 form-group form-group">
                    <label>Apoapsis</label>
                    <input readonly class="form-control" :value="apoapsis">
                </div>
                <div class="col-xs-4 col-sm-3 col-md-4 form-group form-group">
                    <label>Periapsis</label>
                    <input readonly class="form-control" :value="periapsis">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'TransferOrbit',
    props: {
        apoapsis: {
            type: Number,
            required: true
        },
        periapsis: {
            type: Number,
            required: true
        }
    }
}
</script>