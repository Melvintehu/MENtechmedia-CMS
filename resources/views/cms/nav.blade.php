<!-- navigation -->
<div class="col-lg-12 space-inside-sm">
    
    <!-- header -->
    <p class="space-inside-sides-md text-color-main text-semi-bold font-xs space-outside-sm pointer" data-toggle="collapse" data-target="#core-admin">
        Superadmin  
        <i class="material-icons pointer text-hover-light transition-fast" style="position: relative; top: 9px; left: 20px;">keyboard_arrow_down</i>
    </p>

    <div id="core-admin" class="collapse">
        <nav-link id="entity" icon="description"> Entiteiten </nav-link>
        <nav-link id="section" icon="description"> Secties </nav-link>
        <nav-link id="navGroup" icon="apps"> Navigatiegroep </nav-link>  
    </div>  
</div>

<!-- content divider -->
<div style="height: 4px;" class="  col-lg-12 space-inside-xs">
    <div style="height: 4px;" class="bg-tertiary-darken-xs border-dark border-top"></div>
</div>
<!-- end of content divider -->

 @foreach($navGroups as $navGroup)
<div class="col-lg-12 space-inside-sm" data-toggle="collapse" data-target="#{{ $navGroup->name }}">
    <!-- header -->
    <p class="space-inside-sides-md text-color-main text-semi-bold font-xs space-outside-sm pointer">
        {{ $navGroup->name }} 
        <i class="material-icons pointer text-hover-light transition-fast" style="position: relative; top: 9px; left: 20px;">keyboard_arrow_down</i>
    </p>
    
    <div id="{{ $navGroup->name }}" class="collapse">
        @foreach($navGroup->entities as $entity)
            <nav-link id="{{ $entity->name }}" icon="{{ $entity->icon }}"> {{ $entity->title }} </nav-link>
        @endforeach
    </div>
</div>

<!-- content divider -->
<div style="height: 4px;" class="  col-lg-12 space-inside-xs">
    <div style="height: 4px;" class="bg-tertiary-darken-xs border-dark border-top"></div>
</div>
<!-- end of content divider -->

@endforeach