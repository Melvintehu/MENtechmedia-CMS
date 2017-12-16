<!-- navigation -->
<div class="col-lg-12 space-inside-sm">

    <!-- header -->
    <p class="space-inside-sides-md text-color-main text-semi-bold font-xs space-outside-sm pointer collapseAble" data-toggle="collapse" data-target="#core-admin">
        Superadmin  
        <i id="core-admin-caret-right" class="material-icons pointer text-hover-light transition-fast" style="position: relative; top: 9px; left: 20px;">keyboard_arrow_right</i>
    </p>

    <div id="core-admin" class="collapse in">
        <nav-link id="settings" icon="settings"> Settings </nav-link>
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
<div class="col-lg-12 space-inside-sm " >
    <!-- header -->
    <p class="collapseAble space-inside-sides-md text-color-main text-semi-bold font-xs space-outside-sm pointer collapseAble" data-toggle="collapse" data-target="#{{ $navGroup->name }}">
        {{ $navGroup->name }} 
        <i id="{{ $navGroup->name }}-caret-right" class="material-icons pointer text-hover-light transition-fast" style="position: relative; top: 9px; left: 20px;">keyboard_arrow_right</i>
    </p>
    
    <div id="{{ $navGroup->name }}" class="collapse in">
        @forelse($navGroup->entities as $entity)
            <nav-link id="{{ $entity->name }}" icon="{{ $entity->icon }}"> {{ $entity->title }} </nav-link>
        @empty
            <p class="space-inside-sides-md space-inside-sm 
                    block
                    transition-fast 
                    outline-none
                    text-color-secondary-darken-sm text-hover-light text-bold-hover text-bold font-sm
                    pointer ">Geen beheerbare items gevonden.</p>
        @endforelse
    </div>
</div>

<!-- content divider -->
<div style="height: 4px;" class="  col-lg-12 space-inside-xs">
    <div style="height: 4px;" class="bg-tertiary-darken-xs border-dark border-top"></div>
</div>
<!-- end of content divider -->

@endforeach