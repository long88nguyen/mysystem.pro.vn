<template>
  <div class="header">
    <div class="row">
        <div class="col-10">
            <div class="header-search p-2 d-flex align-items-center">
                <input type="text" class="form-control" placeholder="Search ...">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
        <div class="col-2">
            <div class="header-avatar">
                <img src="../../../../assets/uploads/picture_1.png" alt="" srcset="">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header{
    height: 40px;
    width: 100%;
    background: white;
    position: fixed;
    top: 0;
    padding: 10px;
    .header-search{
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        height: 100%;
        input{
            border: none;
            outline: none;
        }
        input:focus{
            box-shadow: unset;
        }
        border-radius: 5px;
    }

    .header-avatar{
        img{
            width: 40px;
            height: 40px;
            border-radius: 25px;
        }
    }
}

.row{
    height: 100%;
}
</style>