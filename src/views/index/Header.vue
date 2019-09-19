<template>
    <div class="topbar">
        <div class="container topbar-container">
            <div class="topbar-left vertical-middle">
                <a class="topbar-logo-href" href="http://www.zhaoshang800.com" target="_blank"><img src="{{ URL::asset('img/index/zg_logo.png') }}" alt="中工招商"/></a>
            </div>
            <div class="position">
                <a class="position-name vertical-middle">{{ city }}</a>
                <div class="position-container">
                    <div class="position-cuur">当前城市：<span>{{ city }}</span></div>
                    <ul class="position-list" id="positionList">
                        <li data-city="{{ $key }}"><a href="{{ URL::asset('') }}">{{ $value['cityName'] }}</a></li>
                        <li data-city="{{ $key }}"><a href="{{ URL::asset($key.'/') }}">{{ $value['cityName'] }}</a></li>
                    </ul>
                </div>
            </div>
            <nav class="topbar-nav vertical-middle">
            <template v-if="isSz">
                <a class="topbar-nav-item" href="{{ URL::asset('') }}">首页</a>
                <a class="topbar-nav-item" href="{{ URL::asset('rent/') }}">写字楼出租</a>
                <a class="topbar-nav-item" href="{{ URL::asset('sell/') }}">写字楼出售</a>
                <a class="topbar-nav-item" href="{{ URL::asset('office/') }}">找楼盘</a>
            </template>
            <template v-else>
                <a class="topbar-nav-item" href="{{ URL::asset($nameSeo.'/') }}">首页</a>
                <a class="topbar-nav-item" href="{{ URL::asset($nameSeo.'/rent/') }}">写字楼出租</a>
                <a class="topbar-nav-item" href="{{ URL::asset($nameSeo.'/sell/') }}">写字楼出售</a>
            </template>
                <a class="topbar-nav-item" href="{{ URL::asset('demand/') }}">委托找房</a>
                <a class="topbar-nav-item" href="{{ URL::asset('delivery/') }}">投放盘源</a>
                <a class="topbar-nav-item" href="{{ URL::asset('news/') }}">资讯</a>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: "IndexHeader",
    props: {
        city: String
    },
    data() {
        return {}
    },
    computed: {
        isSz() {
            return this.city == "sz"
        }
    }
};
</script>