<!-- navigation -->
<div class="col-lg-12 space-inside-sm">
    
    <!-- header -->
    <p class="space-inside-sides-md text-color-main text-semi-bold font-xs space-outside-sm">Super admin</p>

    <nav-link id="entity" icon="description"> Entiteiten </nav-link>
    
</div>


<!-- content divider -->
<div style="height: 4px;" class="  col-lg-12 space-inside-xs">
    <div style="height: 4px;" class="bg-tertiary-darken-xs border-dark border-top"></div>
</div>
<!-- end of content divider -->

<div class="col-lg-12 space-inside-sm">
    
    <!-- header -->
    <p class="space-inside-sides-md text-color-main text-semi-bold font-xs space-outside-sm">Beheer website</p>

    @foreach($entities as $entity)
        <nav-link id="{{ $entity->name }}" icon="{{ $entity->icon }}"> {{ $entity->title }} </nav-link>
    @endforeach
</div>


<!-- content divider -->
<div style="height: 4px;" class="  col-lg-12 space-inside-xs">
    <div style="height: 4px;" class="bg-tertiary-darken-xs border-dark border-top"></div>
</div>
<!-- end of content divider -->