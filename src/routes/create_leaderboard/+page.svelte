<script lang="ts">
    import { PUBLIC_API_DOMAIN } from "$env/static/public";


    const NAME_MAX_LENGTH: number = 50;
    const DESCRIPTION_MAX_LENGTH: number = 500;

    // Define types for the form data
    interface FormData {
      leaderboard_name: string;
      description: string;
      metric: 'weighted_pp' | 'count_unique_beatmaps';
      unique: boolean;
      private: boolean;
      mode: 'osu' | 'taiko' | 'catch' | 'mania';
      mod_filters: string | null;
      score_filters: string | null;
      beatmap_filters: string | null;
      beatmapset_filters: string | null;
    }
  
    // Define types for form validation errors
    interface FormErrors {
        leaderboard_name?: string;
      description?: string;
    }
  
    // Form state with initial values
    let formData: FormData = {
      leaderboard_name: "",
      description: "",
      metric: "weighted_pp",
      unique: false,
      private: false,
      mode: "osu",
      mod_filters: null,
      score_filters: null,
      beatmap_filters: null,
      beatmapset_filters: null
    };

    function validateName(name: string): string | undefined {
    if (!name.trim()) {
    return "Name is required";
    }

    if (name.length > NAME_MAX_LENGTH) {
    return `Name exceeds maximum length of ${NAME_MAX_LENGTH} characters`;
    }

    return undefined;
    }

    function validateDescription(description: string): string | undefined {
    if (!description.trim()) {
    return "Description is required";
    }

    if (description.length > DESCRIPTION_MAX_LENGTH) {
    return `Description exceeds maximum length of ${DESCRIPTION_MAX_LENGTH} characters`;
    }

    return undefined;
    }

    function handleNameInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    formData.leaderboard_name = value;
    const error = validateName(value);
    if (error) {
      errors.leaderboard_name = error;
    } else {
      delete errors.leaderboard_name;
    }
  }

  function handleDescriptionInput(event: Event) {
    const value = (event.target as HTMLTextAreaElement).value;
    formData.description = value;
    const error = validateDescription(value);
    if (error) {
      errors.description = error;
    } else {
      delete errors.description;
    }
  }
  
  function formDataToQueryParams(data: FormData): string {
    const params = new URLSearchParams();
    
    // Add all non-null values to query params
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        // Convert booleans to strings
        if (typeof value === 'boolean') {
          params.append(key, value ? 'true' : 'false');
        } else {
          params.append(key, value.toString());
        }
      }
    });
    
    return params.toString();
  }

    // Form validation
    let errors: FormErrors = {};
    
    function validateForm(): boolean {
    errors = {};
    
    const nameError = validateName(formData.leaderboard_name);
    if (nameError) {
      errors.leaderboard_name = nameError;
    }
    
    const descriptionError = validateDescription(formData.description);
    if (descriptionError) {
      errors.description = descriptionError;
    }
    
    return Object.keys(errors).length === 0;
  }
    
    async function handleSubmit(): Promise<void> {
      if (!validateForm()) {
        return;
      }
      
      try {
        // Here you can replace with your specific URL and headers
        const queryParams = formDataToQueryParams(formData);
        const url = `${PUBLIC_API_DOMAIN}/create_leaderboard?${queryParams}`;
        const response = await fetch(url, {
          method: 'POST',
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        
        if (response.ok) {
          // Handle successful response
          alert('Form submitted successfully!');
          // Optionally reset the form or redirect
        } else {
          // Handle error response
          console.error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  
    // Helper function to handle nullable string inputs
    function updateNullableField(field: keyof FormData, value: string): void {
      formData[field] = value.trim() === "" ? null : value;
    }
  </script>
  
  <div class="container mx-auto px-4 py-8 max-w-2xl">
    <div class="bg-muted/50 rounded-lg shadow-md p-6">
      <h1 class="text-2xl font-bold mb-6 text-center">Score Configuration</h1>
      
      <form on:submit|preventDefault={handleSubmit} class="space-y-6">
        <!-- Name input -->
        <div>
          <label for="leaderboard_name" class="block text-sm font-medium text-gray-700 mb-1">Leaderboard Name *</label>
          <input
            type="text"
            id="leaderboard_name"
            bind:value={formData.leaderboard_name}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          {#if errors.leaderboard_name}
            <p class="mt-1 text-sm text-red-600">{errors.leaderboard_name}</p>
          {/if}
        </div>
        
        <!-- Description input -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Leaderboard Description *</label>
          <textarea
            id="description"
            bind:value={formData.description}
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          ></textarea>
          {#if errors.description}
            <p class="mt-1 text-sm text-red-600">{errors.description}</p>
          {/if}
        </div>
        
        <!-- Metric selection -->
        <div>
        <span class="text-center mx-auto table font-thin text-gray-600 text-sm italic">See the <a href="https://api.enslow.me/docs" class="text-blue-500 hover:underline">docs</a> for syntax and info</span>
          <label for="metric" class="block text-sm font-medium text-gray-700 mb-1">Metric</label>
          <select
            id="metric"
            bind:value={formData.metric}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="weighted_pp">Weighted PP</option>
            <option value="count_unique_beatmaps">Count Unique Beatmaps</option>
          </select>
        </div>
        
        <!-- Mode selection -->
        <div>
          <label for="mode" class="block text-sm font-medium text-gray-700 mb-1">Game Mode</label>
          <select
            id="mode"
            bind:value={formData.mode}
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="osu">osu!</option>
            <option value="taiko">Taiko</option>
            <option value="catch">Catch</option>
            <option value="mania">Mania</option>
          </select>
        </div>
        
        <!-- Boolean toggles -->
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="unique"
              bind:checked={formData.unique}
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="unique" class="ml-2 block text-sm text-gray-700">Unique Beatmaps</label>
          </div>
          
          <div class="flex items-center">
            <input
              type="checkbox"
              id="private"
              bind:checked={formData.private}
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="private" class="ml-2 block text-sm text-gray-700">Private</label>
          </div>
        </div>
        
        <!-- Optional filter inputs -->
        <div class="space-y-4">
          <div>
            <label for="mod_filters" class="block text-sm font-medium text-gray-700 mb-1">Mod Filters</label>
            <input
              type="text"
              id="mod_filters"
              value={formData.mod_filters || ""}
              on:input={(e) => updateNullableField('mod_filters', e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional"
            />
          </div>
          
          <div>
            <label for="score_filters" class="block text-sm font-medium text-gray-700 mb-1">Score Filters</label>
            <input
              type="text"
              id="score_filters"
              value={formData.score_filters || ""}
              on:input={(e) => updateNullableField('score_filters', e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional"
            />
          </div>
          
          <div>
            <label for="beatmap_filters" class="block text-sm font-medium text-gray-700 mb-1">Beatmap Filters</label>
            <input
              type="text"
              id="beatmap_filters"
              value={formData.beatmap_filters || ""}
              on:input={(e) => updateNullableField('beatmap_filters', e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional"
            />
          </div>
          
          <div>
            <label for="beatmapset_filters" class="block text-sm font-medium text-gray-700 mb-1">Beatmapset Filters</label>
            <input
              type="text"
              id="beatmapset_filters"
              value={formData.beatmapset_filters || ""}
              on:input={(e) => updateNullableField('beatmapset_filters', e.currentTarget.value)}
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Optional"
            />
          </div>
        </div>
        
        <!-- Submit button -->
        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  </div>